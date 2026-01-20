<script setup>
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/"></RouterLink>
        </nav>
    </header>
    <RouterView />
</template>

<style>
.btn-primary {
    background-color: rgb(192, 235, 238);
}

nav {
    display: flex;
    gap: 20px;
    padding: 20px;
    text-decoration: underline;
}

nav a:hover {
    color: blue;
}
</style>