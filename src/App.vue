<script setup>
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Conectare</RouterLink>
            <RouterLink to="/Politica">Politica de confidentialitate</RouterLink>
            <RouterLink to="/Termeni">Termeni si conditii</RouterLink>
            <RouterLink to="/ParolaUitata">Parola uitata</RouterLink>

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