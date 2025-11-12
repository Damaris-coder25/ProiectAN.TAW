<script setup>
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Conectare</RouterLink>
            <RouterLink to="/">Alege contul</RouterLink>
            <RouterLink to="/">Cont inexistent</RouterLink>
            <RouterLink to="/">Inregistrare</RouterLink>
            <RouterLink to="/">Politica de confidentialitate</RouterLink>
            <RouterLink to="/">Termeni si conditii</RouterLink>

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