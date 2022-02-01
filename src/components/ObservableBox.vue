<template>
    <div ref="clickMe" class="click-me">
        Click Me
        <br>
        {{numberOfClicks}}
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { asyncScheduler, auditTime, buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, connect, debounce, debounceTime, delay, EMPTY, filter, fromEvent, interval, map, pluck, scan, takeUntil, throttle, throttleTime, timeInterval, timer } from 'rxjs'
import { useToast } from 'vue-toastification';

const clickMe = ref<HTMLDivElement | null>(null)
const clickType = ref('')
const numberOfClicks = ref(0)
const toast = useToast()

onMounted(() => {
    const myObservable = fromEvent(clickMe.value, 'click')

    let myPipe = myObservable.pipe(
        connect(val => val.pipe(
            buffer(val.pipe(
                throttleTime(2000, asyncScheduler, { leading: false, trailing: true })
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
    .click-me {
        @apply h-[300px] w-[600px] flex justify-center items-center;
        @apply border-2 border-gray-600 bg-yellow-100 cursor-pointer rounded;
    }
</style>