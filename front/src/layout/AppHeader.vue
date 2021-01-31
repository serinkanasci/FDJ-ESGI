<template>
  <nav
    class="font-sans bg-white text-center flex justify-between items-center my-4 mx-auto container overflow-hidden"
  >
    <ul class="text-sm text-gray-700 list-none p-0 flex items-center">
            <li>
        <a
          href="Home"
          class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
          >Home</a
        >
      </li>
      <li>
        <a
          href="Lotery"
          class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
          >Loterie</a
        >
      </li>
      <li>
        <a
          href="Pari"
          class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
          >Pari</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data: function() {
    return {
      open: 0
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>
