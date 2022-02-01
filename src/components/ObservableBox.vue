<template>
    <div class="main">
        <span>Timeout Period: 4 sec</span>
        <div ref="clickMe" class="click-me">
            Click Me
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { asyncScheduler, buffer, connect, fromEvent, map, throttleTime } from 'rxjs'
import { useToast } from 'vue-toastification';

const toast = useToast()

const clickMe = ref<HTMLDivElement | null>(null)

onMounted(() => {
    const myObservable = fromEvent(clickMe.value!, 'click')

    let myPipe = myObservable.pipe(
        connect(val => val.pipe(
            buffer(val.pipe(
                throttleTime(4 * 1000, asyncScheduler, { leading: false, trailing: true })
            ))
        )),
        map((val) => {
            return val.length
        })
    )

    myPipe.subscribe((value) => {
        if(value >= 2) {
            toast.success("Double Click!")
        } else {
            toast.info("Single Click!")
        }
    })
})


</script>

<style lang="postcss">
.main {
    span {
        @apply flex justify-center mb-4;
    }

    .click-me {
        @apply h-[300px] w-[600px] flex justify-center items-center;
        @apply border-2 border-gray-600 bg-yellow-100 cursor-pointer rounded;
    }
    
}
</style>