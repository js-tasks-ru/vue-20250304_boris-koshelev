<script setup>
import { defineProps } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.vue'
import MeetupDescription from './MeetupDescription.vue'
import MeetupCover from './MeetupCover.vue'
import MeetupInfo from './MeetupInfo.vue'

const props = defineProps({
  meetup: Object,
})
</script>

<template>
  <div>
    <MeetupCover :title="props.meetup.title" :image="props.meetup.image" />
    <!-- Обложка митапа -->

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <h2>Описание</h2>

          <!-- Описание митапа -->
          <MeetupDescription :description="props.meetup.description" />
          <h2>Программа</h2>

          <!-- Программа митапа -->
          <MeetupAgenda v-if="props.meetup.agenda.length" :agenda="meetup.agenda"></MeetupAgenda>
          <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
          <UiAlert v-else></UiAlert>
        </div>
        <div class="meetup__aside">
          <!-- Краткая информация о митапе -->
          <MeetupInfo :date="props.meetup.date" :organizer="props.meetup.organizer" :place="props.meetup.place" />
          <div class="meetup__aside-buttons"></div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-large);
  margin-block-start: var(--spacing-large);
}

.meetup__content {
}

.meetup__aside {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.meetup__aside-buttons {
  padding-inline-start: calc(var(--control-size-small) + var(--spacing-small));
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-smaller);
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0;
  }

  .meetup__aside {
    width: 350px;
    /* Inline with tabs */
    margin-block-start: var(--control-size);
  }

  .meetup__aside-buttons {
    flex-direction: column;
  }
}
</style>
