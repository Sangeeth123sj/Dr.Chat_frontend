<template>
  <div>
    <h1>Pricing</h1>
    <br/>
    <div class="pricing-plans">
      <div class="plan basic">
        <h2>Personal</h2>
        <p class="price">Free</p>
        <ul>
          <li>Access to AI-powered medical summary generator</li>
          <li>Upto 10 medical summaries</li>
          <li>Basic email support</li>
        </ul>
        <a href="#" class="button">Get started</a>
      </div>
      <div class="plan individual">
        <h2>Premium</h2>
        <p class="price">$19.99/month</p>
        <ul>
          <li>Access to AI-powered medical summary generator</li>
          <li>Unlimited medical summaries</li>
          <li>Priority support</li>
          <li>History</li>
        </ul>
        <a href="#" class="button">Get started</a>
      </div>
      <div class="plan organization">
        <h2>Organization</h2>
        <p class="price">$29.99/month</p>
        <ul>
          <li>Access to AI-powered medical summary generator</li>
          <li>Unlimited medical summaries</li>
          <li>Priority support</li>
          <li>Organization reports history</li>
        </ul>
        <a href="#" class="button">Get started</a>
      </div>
            <!-- <div class="plan organization">
        <h2>Personal</h2>
        <p class="price">$29.99/month</p>
        <ul>
          <li>Access to AI-powered medical summary generator</li>
          <li>Unlimited medical summaries</li>
          <li>Dedicated support</li>
        </ul>
        <a href="#" class="button">Get started</a>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Pricing",
};
</script>

<style scoped>
.pricing-plans {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.plan {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  flex: 1;
}

.plan h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 3rem;
  margin-bottom: 2rem;
}

ul {
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
  color: #fff;
}

li {
  margin-bottom: 0.5rem;
}

.button {
  display: inline-block;
  background-color: #0077ff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: #0052cc;
}

@media only screen and (max-width: 767px) {
  .pricing-plans {
    flex-direction: column;
    align-items: center;
  }

  .plan {
    margin-bottom: 2rem;
    flex: none;
    width: 100%;
  }

  .plan h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
  }

  .button {
    font-size: 0.9rem;
  }
}
</style>
