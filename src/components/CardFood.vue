<template>
    <div class="card text-bg-dark mb-3 clicked" style="max-width: 540px;" @click="clicked">
        <div class="row g-0">
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ dish.name}}</h5>
                    <p class="card-text">{{ dish.description }}</p>
                    <p class="card-text"><strong>{{ dish.price }}</strong></p>

                </div>
            </div>
            <div class="col-md-4 d-flex align-items-stretch">
                <img :src="dish.image" class="img-fluid rounded-end w-100 h-100" style="object-fit: cover;" :alt="dish.description" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardFood",
    props: {
        dish: {
            type: Object,
            required: true,
        }
    },methods:{
        clicked(){
            console.log(this.dish.id);
          this.$router.push({
            name: 'PlatoCompleted',
            params: {
              id: this.dish.id,
            },
          });
        }
    }
};
</script>

<style scoped>
.clicked{
    cursor: pointer;
    user-select: none;
}
</style>
