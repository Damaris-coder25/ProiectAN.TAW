<script setup>
import IstoList from '@/components/Istoric/IstoList.vue';
import { useCountIsto } from '@/stores/countIsto';

const countStore = useCountIsto()
</script>

<template>
    <div class="text-center mt-5">
    <IstoList />
    </div>
    <div>
    <p>Istoric: {{ countStore.countIsto }}</p>
    <p>Total venit luna aceasta: <b>{{ countStore.monthlyRevenue }} lei</b></p>
    <p>Total venit general: {{ countStore.totalRevenue }} lei</p>
    <p>Venit mediu: {{ countStore.averageRevenuePerEntry }} lei</p>
<p>
  Cea mai mare înregistrare:
  {{ countStore.biggestEntry.title }} - {{ countStore.biggestEntry.total }} lei
</p>

<p>
  Cea mai mică înregistrare:
  {{ countStore.smallestEntry.title }} - {{ countStore.smallestEntry.total }} lei
</p>
<br>
    <h3>Ultimele 5 înregistrări:</h3>
   <ul v-if="countStore.lastFiveEntries.length">
  <li v-for="isto in countStore.lastFiveEntries" :key="isto.id">
    {{ isto.title }} - {{ isto.total }} lei - {{ new Date(isto.date).toLocaleDateString() }}
  </li>
</ul>
<p v-else>Nu există înregistrări recente.</p>
  
  </div>
</template>