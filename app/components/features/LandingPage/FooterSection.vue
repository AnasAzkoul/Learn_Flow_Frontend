<script lang="ts" setup>
const currentYear = new Date().getFullYear();

const linkColumns = [
  {
    title: "PRODUCT",
    links: ["How it works", "Demo", "Pricing", "Changelog"],
  },
  {
    title: "COMPANY",
    links: ["Manifesto", "Blog", "Careers", "Contact"],
  },
  {
    title: "CHANNELS",
    links: ["Github", "Twitter", "Discord", "RSS"],
  },
];
</script>

<template>
  <footer class="relative bg-esp-900 pt-20 pb-8">
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <div class="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-[60px]">
      <div class="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16">
        <!-- Left: headline -->
        <div class="max-w-xl space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 bg-primary rounded-sm" />
            <span class="mono-space text-text-on-dark-mut">
              TRANSMISSION_END
            </span>
          </div>

          <h2 class="display-text text-5xl sm:text-6xl lg:text-7xl text-text-on-dark">
            BUILD<br>
            <span class="text-primary">BEYOND.</span>
          </h2>

          <p class="font-display text-lg text-text-on-dark-sec">
            This is not a school. This is an assembly plant for the mind.
          </p>
        </div>

        <!-- Right: link columns -->
        <nav class="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
          <div v-for="column in linkColumns" :key="column.title">
            <h4 class="mono-space text-text-on-dark-mut mb-4">
              {{ column.title }}
            </h4>
            <ul class="space-y-2.5">
              <li v-for="link in column.links" :key="link">
                <a
                  class="font-display text-sm text-text-on-dark-sec hover:text-text-on-dark transition-colors duration-200"
                  href="#"
                >
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-esp-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="mono-space text-text-on-dark-mut">
          &copy; {{ currentYear }} LEARNFLOW
        </span>
        <span class="mono-space text-primary">
          40.7128&deg; N, 74.0060&deg; W
        </span>
        <span class="mono-space text-text-on-dark-mut">VERSION_2.0.1</span>
      </div>
    </div>
  </footer>
</template>
