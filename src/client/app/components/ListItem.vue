<template>
  <li><slot /></li>
</template>

<style lang="scss" scoped>
li {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--light-grey);
  &:last-of-type {
    border-bottom: none;
  }
}
</style>
