<template>
  <div class="policies-container">
    <h1>Políticas de Cookies</h1>
    <p>En nuestro sitio web, utilizamos cookies para asegurarnos de proporcionarte la mejor experiencia de usuario posible.</p>

    <h2>¿Qué son las cookies?</h2>
    <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas ciertos sitios web. Nos ayudan a entender cómo interactúas con nuestro sitio, lo que nos permite mejorar nuestros servicios y tu experiencia.</p>

    <h2>Cookies que usamos</h2>
    <h3>Cookies esenciales</h3>
    <p>Estas cookies son necesarias para el funcionamiento de nuestro sitio web. Incluyen, por ejemplo, cookies que te permiten acceder a áreas seguras de nuestro sitio web.</p>

    <h3>Cookies de análisis/performance</h3>
    <p>Nos permiten reconocer y contar la cantidad de visitantes y ver cómo se mueven por nuestro sitio web cuando lo están utilizando. Esto nos ayuda a mejorar el funcionamiento de nuestro sitio web.</p>

    <h3>Cookies de funcionalidad</h3>
    <p>Estas se utilizan para reconocerte cuando vuelves a nuestro sitio web. Esto nos permite personalizar nuestro contenido para ti y recordar tus preferencias.</p>

    <h2>Cómo controlar las cookies</h2>
    <p>Puedes bloquear las cookies ajustando la configuración de tu navegador para que no acepte cookies. Sin embargo, si utilizas la configuración del navegador para bloquear todas las cookies, es posible que no puedas acceder a todo o parte de nuestro sitio.</p>

    <p>Para más detalles sobre cómo manejar las cookies, consulta la ayuda de tu navegador.</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.policies-container {
  width: 80%;
  margin: auto;
  padding: 2rem 0;
}

.policies-container h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.policies-container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.policies-container h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.policies-container p {
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 1rem;
}

.policies-container a {
  color: #1f2937;
  font-weight: 600;
}

.policies-container a:hover {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .policies-container {
    width: 90%;
  }
}

@media (max-width: 576px) {
  .policies-container {
    width: 100%;
  }
}


</style>
