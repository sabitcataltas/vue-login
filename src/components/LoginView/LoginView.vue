<script lang="ts" src="./LoginView.ts" />

<template>
    <div class="login-container">
        <form name="login-form">
            <div class="mb-3">
                <label for="username">Username: </label>
                <input type="text" id="username" v-model="input.username" />
            </div>
            <div class="mb-3">
                <label for="password">Password: </label>
                <input type="password" id="password" v-model="input.password" />
            </div>
            <button type="submit" v-on:click.prevent="login()">
                Login
            </button>
        </form>
        <div v-if="errorMessage.message" class="error-message">
            {{ errorMessage.message }}
        </div>
    </div>
</template>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 300px;
}

.login-container h2 {
    margin-top: 0;
    text-align: center;
}

.login-container input[type="text"],
.login-container input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.login-container button[type="submit"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-container button[type="submit"]:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
}
</style>