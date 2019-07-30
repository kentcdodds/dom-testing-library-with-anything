<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<div><button on:click={increment}>{count}</button></div>
