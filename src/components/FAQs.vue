<template>
  <div id="faq-page">
    <h3 id="faq-header">FAQs About Deliverpool</h3>

    <div class="accordion" id="accordionExample" style="width: 80vw">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            style="font-weight: 750"
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            What is Deliverpool?
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            Deliverpool is a platform which aims to
            <strong
              >provide users with a more affordable and convenient way to bundle
              their orders together on food delivery platforms.
            </strong>
            We help users from the same locality / region to group-order
            together so they can collectively stack their orders from the same
            restaurant and trim down the incurrence of additional fees (e.g
            delivery or small order fees). Users can create “pools” for group
            order on our application by sharing the invite link from food
            delivery platforms. These group order pools can then be made
            available for other users to view and join via the shared links.
            That way, users will no longer be constrained to place group orders
            with only their friends, as they will now be able to order with
            anyone, regardless of whether they know each other.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            style="font-weight: 750"
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            How do I create a pool?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            1. Click on <strong>“Create”</strong> will direct you to the
            corresponding restaurant’s page on the delivery platform. <br />2.
            Start a <strong>Group Order</strong> on the platform and copy the
            invite link. Note: For Grab, you can only do so on the mobile
            app.<br />
            3.<strong
              >Come back to Deliverpool and fill in Pool Creation Form.</strong
            ><br />
            4. The pool that you created will be shown under the My Pools page.
            You can chat with other users there.<br />
            5. You will be notified via email when there is less than 10 mins to
            the cut-off time set by you. <br />6. The pool will close once the
            cut-off time is reached. <br />7. Check out the group order on the
            delivery platform. <br />8. Sit back and wait for your food to be
            delivered!
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            style="font-weight: 750"
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            How do I join a pool?
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            1. Go to the <strong>Join Pools Page </strong><br />
            2. Click on the <strong>Join</strong> button and a pop-up window
            will let you copy the group order invite link to your clipboard.<br />
            3. Go to the delivery platform for this pool and add your favorite
            dishes to the group order.
            <strong>Note: For Grab, you need their mobile app to do so.</strong>
            The pool that you joined will be reflected under the
            <strong>My Pools page.</strong> You can also chat with other users
            there. <br />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFour">
          <button
            style="font-weight: 750"
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="true"
            aria-controls="collapseFour"
          >
            Can I quit a pool after I joined it?
          </button>
        </h2>
        <div
          id="collapseFour"
          class="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            You can only quit a pool if there is still
            <strong>more than 10 mins to its cut-off time.</strong>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFive">
          <button
            style="font-weight: 750"
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="true"
            aria-controls="collapseFive"
          >
            Can I cancel a pool after I created it?
          </button>
        </h2>
        <div
          id="collapseFive"
          class="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            You may not cancel a pool / edit its details after you have created
            it to minimize confusion among users. We strongly encourage our
            users to only create a pool they can commit to. In the event that a
            user wishes to cancel the pool or edit the pool details, the user
            should update the other users in the pool via the chat function
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#faq-page {
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#faq-header {
  color: #ffad42;
  font-weight: 700;
  margin-bottom: 50px;
}
</style>