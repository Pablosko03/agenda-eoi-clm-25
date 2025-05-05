const baseUrl = "https://irileofdjkcmspvebnqq.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"

function createContact() {
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