<script lang="ts">

    const currentTime = Date()
    const currentHour = new Date(currentTime).getHours()

    let greeting = ''

    if (currentHour < 12) {
        greeting = 'Buenos dias!'
    } else if (currentHour < 18) {
        greeting = 'Buenas tardes!'
    } else {
        greeting = 'Buenas noches!'
    }
</script>

<h1 class="text-4xl font-bold" >{greeting}</h1>