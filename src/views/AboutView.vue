<template>
  <div class="about">
    <h1>Bookshop</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptatum, quibusdam, quia, quae voluptatem voluptas quod dolorum
      voluptatibus quos voluptates quidem. Quisquam voluptatum, quibusdam,
      quia, quae voluptatem voluptas quod dolorum voluptatibus quos
      voluptates quidem.	</p>
      <img class="logo-image" src="../assets/bookshop-logo.jpg" alt="Bookshop" />
  </div>
  
  <div class="footer">
    <div class="impressum">
      <h1>Impressum</h1>
      <p>
        <strong>Angaben gemäß § 5 TMG</strong>
      </p>
      <p>Beispiel GmbH</p>
      <p>Beispiel-Straße, 99</p>
      <p>99999, Dresden</p>
      <p>+49 0199 999999</p>
      <p>+49 99999</p>
      <p>admin@admin.com</p>
      <p>bookshop.de</p>
      <p>vertreten durch die Geschäftsführer: Max Maximilian</p>
      <p>Registergericht der GmbH: Amtsgericht Dresden</p>
      <p>Registernummer der GmbH: HRB 99999</p>
      <p>USt- IDNr.: DE 999999999</p>
    </div>
  </div>
</template>

<style>
.footer {
  /* position: absolute; */
  align-self: baseline;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
}
.logo-image {
  padding: 20px 0;
  width:60%;
  height: auto;
  object-fit: contain; /* Don't scale image */
}
@media (min-width: 1024px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
