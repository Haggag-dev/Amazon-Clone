// Amazon navbar. To relocate later.
export const html = `
<nav class="mr-4 ml-4 flex h-full items-center justify-between">
  <section class="w-[180px] max-grid4:w-[unset]">
    <a
      href="."
      class="inline-block rounded-sm border-1 border-solid border-transparent p-1.5 hover:border-1 hover:border-solid hover:border-white"
    >
      <image
        src="images/logos/amazon-mobile-logo-white.png"
        alt="Amazon Logo"
        class="h-8 md:hidden"
      />

      <image
        src="images/logos/amazon-logo-white.png"
        class="w-[100px] max-md:hidden"
      />
    </a>
  </section>

  <label for="search-bar" class="mr-5 ml-5 flex flex-1 justify-center">
    <input
      id="search-bar"
      name="search-bar"
      type="text"
      placeholder="Search"
      class="focus:outline-amazondthird h-10 w-0 max-w-[850px] grow basis-0 rounded-l-sm bg-white pl-4 focus:outline-2 focus:outline-solid"
    />

    <button
      class="bg-amazonfirst h-10 shrink-0 cursor-pointer overflow-clip rounded-r-sm p-2"
    >
      <image
        src="/images/icons/search-icon.png"
        alt="Search Icon"
        class="h-6"
      />
    </button>
  </label>

  <!-- The right section of the navbar for desktop. You will find below that it is replaced with a hamburger menu for mobile. -->
  <section class="flex w-[180px] shrink-0 justify-center max-md:hidden">
    <!-- To add: Hyperlinks for each 'a' element. -->
    <a
      href=""
      class="flex flex-col justify-center rounded-sm border-1 border-solid border-transparent p-1.5 leading-4 text-white hover:border-1 hover:border-solid hover:border-white max-md:hidden"
    >
      <span class="block text-[13px]">Returns</span>
      <span class="block text-[15px] font-bold">& Orders</span>
    </a>
    <a
      href="checkout.html"
      class="relative flex items-center justify-end rounded-sm border-1 border-solid border-transparent p-1.5 hover:border-1 hover:border-solid hover:border-white max-md:hidden"
    >
      <image src="images/icons/cart-icon.png" class="w-[50px]" />
      <!-- For JS, to be cart quantity -->
      <div
        class="js-display-quantity text-amazonfifth w-[26px] absolute top-[2px] left-[22px] text-center text-[16px] font-[700]"
      >
        0
      </div>
      <div class="mt-3 text-[15px] font-[700] text-white">Cart</div>
    </a>
  </section>

  <button class="h-7 cursor-pointer duration-[1.5] md:hidden">
    <image
      src="images/icons/hamburger-menu.png"
      alt="Hamburger Menu"
      class="js-hamburger-menu"
    />
  </button>

  <div
    class="bg-amazonbg js-burger-toggle absolute top-[60px] right-0 left-0 max-h-0 overflow-hidden text-center text-[16px] font-[600] text-white transition-[max-height] duration-250 md:hidden"
  >
    <a class="hover:bg-burgerlinkbg z-10 block cursor-pointer p-[8px]"
      >Returns & Orders</a
    >
    <a href="checkout.html" class="hover:bg-burgerlinkbg z-10 block cursor-pointer p-[8px]">
      Cart (<span class="js-mobile-display-quantity text-amazonfirst text-[16px] font-[700]">0</span>)
    </a>
  </div>
</nav>`;
