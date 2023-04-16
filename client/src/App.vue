<template>
  <router-view />
</template>

<script setup lang="ts">
  import { usePermission } from '@vueuse/core';
  const permission = usePermission('notifications');
  if(!permission.value) window.Notification.requestPermission();
 
</script>
