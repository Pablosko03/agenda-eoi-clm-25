const baseUrl = "https://irileofdjkcmspvebnqq.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"

/**
 * 1. Obtener los valores de los inputs
 * 2. LLamar a la API con el método POST
 * 3. Validar la respuesta
 * 4. Mostrar mensaje de error o éxito
 */

const inEmail = document.getElementById("email")
const inPassword = document.getElementById("pass")

function login() {
    const email = inEmail.value
    const password = inPassword.value

    const url = baseUrl + "/auth/v1/token?grant_type=password"

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const token = result.access_token
            const userId = result.user.id

            localStorage.setItem("token", token)
            localStorage.setItem("userId", userId)
            
            window.location.href = "index.html"
        })
        .catch((error) => console.error(error));
}

function register() {
    const email = inEmail.value
    const password = inPassword.value

    const url = baseUrl + "/auth/v1/signup"

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const token = result.access_token
            const userId = result.user.id

            localStorage.setItem("token", token)
            localStorage.setItem("userId", userId)

            window.location.href = "index.html"
            
        })
        .catch((error) => console.error(error));
}