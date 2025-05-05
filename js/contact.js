const baseUrl = "https://irileofdjkcmspvebnqq.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"

let params = new URLSearchParams(window.location.search);
let idEdit = params.get("id");

if (idEdit) {
    document.getElementById("title").innerText = "Editar contacto";
    document.getElementById("save").innerText = "Actualizar contacto";
    document.getElementById("save").classList.remove("hidden");
    document.getElementById("create").classList.add("hidden");

    getContact();
    document.getElementById("save").addEventListener("click", updateContact);

}else{
    document.getElementById("create").addEventListener("click", createContact);
}

function getContact() {
    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("token")

    let url = baseUrl + "/rest/v1/contacts"
    url += `?user_id=eq.${userId}`
    url += `&id=eq.${idEdit}`

    const requestOptions = {
        method: "GET",
        headers: {
            "apiKey": apiKey,
            "Authorization": `Bearer ${accessToken}`
        }
    }

    fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log("La API ha respondido: ", data)
            document.getElementById("name").value = data[0].name
            document.getElementById("email").value = data[0].email
            document.getElementById("phone").value = data[0].phone
        })
        .catch((error) => {
            console.log("Ha ocurrido un error: ", error)
        })
}

function updateContact() {
    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("token")

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value

    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "apiKey": apiKey,
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            user_id: userId
        })
    }

    const url = baseUrl + "/rest/v1/contacts?id=eq." + idEdit

    fetch(url, requestOptions)
        .then((response) => {
            if (response.status == 204) {
                window.location.href = "index.html"
            }
        })
        .catch((error) => console.error(error));
}

async function createContact() {
    const user_id = localStorage.getItem("userId")
    const access_token = localStorage.getItem("token")

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey,
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            user_id: user_id
        })
    }

    const url = baseUrl + "/rest/v1/contacts"

    fetch(url, requestOptions)
        .then((response) => {
            if (response.status == 201) {
                window.location.href = "index.html"
            }
        })
        .catch((error) => console.error(error));
}