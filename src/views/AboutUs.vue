<template>
    <navbar address="Barbosa" ></navbar>

    <div v-for="person in people" class="container ">

        <div class="card1">
            <div class="card1-info">
                <img src="@/assets/logoMain.png" class="card1-avatar">
                <div class="card1-title">{{person.name}}</div>
                <div class="card1-subtitle">{{person.email}}</div>
            </div>
            <ul class="card-social">
                <li class="card-social__item">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z"></path>
                    </svg></li>
                <li class="card-social__item">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z"></path>
                    </svg></li>
                <li class="card-social__item">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z"></path>
                    </svg>
                </li>
            </ul>
        </div>







    </div>

</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
    name: "Aboutus",
    components: { Navbar },
    data(){
        return{
            people:[
                {
                    name:"Harrison Diaz",
                    email: "harrison.diaz@uptc.edu.co",
                    code: "201920260"
                },{
                    name:"Andres Amaya",
                    email: "andres.amaya04@uptc.edu.co",
                    code: "201920261"
                },

            ]

        }
    }
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 10% auto;
}

.card1 {
    background: #f5f5f5;
    padding: 2rem 1.5rem;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.card1-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.card1-avatar {
    --size: 60px;
    background: linear-gradient(to top, #f1e1c1 0%, #fcbc97 100%);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    transition: transform 0.2s ease;
    margin-bottom: 1rem;
}

.card1-title {
    color: #333;
    font-size: 1.5em;
    font-weight: 600;
    line-height: 2rem;
    margin-bottom: 0.5rem;
}

.card1-subtitle {
    color: #859ba8;
    font-size: 0.8em;
}

.card-social {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1.5rem;
}

.card-social__item {
    list-style: none;
}

.card-social__item svg {
    display: block;
    height: 18px;
    width: 18px;
    fill: #515f65;
    cursor: pointer;
    transition: fill 0.2s ease, transform 0.2s ease;
}

.card1:hover {
    box-shadow: 0 8px 50px rgba(35, 35, 35, 0.1);
}

.card1:hover .card1-avatar {
    transform: scale(1.1);
}

.card-social__item svg:hover {
    fill: #232323;
    transform: scale(1.1);
}

@media screen and (max-width: 480px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>