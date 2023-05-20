<template>

    <button type="button" class="button">
        <span class="button__text">{{ text }}</span>
        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
    </button>
</template>

<script>
export default {
    name: "NewButton",
    props:{
        text:String,

    }
}
</script>

<style scoped>
.button {
    position: relative;
    width: 150px;
    height: 40px;
    cursor: pointer;
    margin-left: 20px;
    margin-bottom: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #34974d;
    background-color: #3aa856;
}

.button, .button__icon, .button__text {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}

.button .button__text {
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    transform: translateX(30px);
    color: #fff;
    font-weight: 600;
}

.button .button__icon {
    position: absolute;
    -webkit-transform: translateX(109px);
    -ms-transform: translateX(109px);
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: #34974d;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.button .svg {
    width: 30px;
    stroke: #fff;
}

.button:hover {
    background: #34974d;
}

.button:hover .button__text {
    color: transparent;
}

.button:hover .button__icon {
    width: 148px;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
}

.button:active .button__icon{
    background-color: #2e8644;
}

.button:active {
    border: 1px solid #2e8644;
}


</style>