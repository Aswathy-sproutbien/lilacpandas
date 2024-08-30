<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let activeIndex = writable(0);
    let slides = [
      {
        id: 1,
        bgClass: 'bg-red-300',
        src: '/assets/img/slider-img.png',
        alt: 'First Slide',
        heading: 'Find Your Perfect Ride with Ease',
        description:
          'Discover the best products for your kids with our extensive collection of fun and educational items, carefully selected for quality and enjoyment.',
       img_class:'w-1/4 h-full object-cover',
        },
      {
        id: 2,
        bgClass: 'bg-blue-300',
        src: '/assets/img/saving-img.png',
        alt: 'Second Slide',
        heading: 'Save Big on the Best Deals',
        description:
          'Explore amazing discounts and save on top-quality products with our unbeatable offers, handpicked just for you.',
          img_class:'w-65 h-full object-cover',
        },
    ];
  
    function nextSlide() {
      activeIndex.update(n => (n+1) % slides.length);
    }
  
    onMount(() => {
      const interval = setInterval(nextSlide, 1000); // Slower transition interval
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="relative w-full h-80 overflow-hidden">
    <div
      class="transition-transform duration-1000 ease-in-out"
      style="transform: translateX({-$activeIndex * 2}%);"
    >
      {#each slides as slide (slide.id)}
        {#if $activeIndex === slides.indexOf(slide)}
          <div class="{slide.bgClass} p-6 h-80 overflow-hidden relative">
            <div class="flex items-center justify-between h-full">
              <!-- Left Side: Heading and Description with Sliding Effect -->
              <div class="w-1/2 text-left transform transition-opacity duration-1000 ease-in-out">
                <h2 class="text-white text-4xl font-semibold leading-normal">
                  {slide.heading}
                </h2>
                <p class="text-white text-lg mt-4">
                  {slide.description}
                </p>
              </div>
          
              <!-- Right Side: Image -->
              <div class="w-1/2 flex justify-center items-center">
                <img src={slide.src} alt={slide.alt} class="{slide.img_class}" />
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  
    <!-- Indicators -->
    <div class="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-2">
      {#each slides as _, i}
        <div
          class="w-3 h-3 bg-white rounded-full cursor-pointer"
          class:bg-opacity-50={$activeIndex !== i}
          on:click={() => $activeIndex = i}
        ></div>
      {/each}
    </div>
  </div>
  