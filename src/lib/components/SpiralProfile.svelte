<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import type { SpiralStage } from '../types/spiral';

  export let profileData: Record<SpiralStage, number>;
  export let centerOfGravity: SpiralStage;
  
  let chart: HTMLDivElement;
  
  const stages: SpiralStage[] = [
    'beige', 'purple', 'red', 'blue', 'orange', 
    'green', 'yellow', 'turquoise', 'coral'
  ];
  
  const colors = {
    beige: '#E5D0BA',
    purple: '#9B6B9E',
    red: '#E25A53',
    blue: '#4A72B2',
    orange: '#FF7F27',
    green: '#7AB55C',
    yellow: '#FFD700',
    turquoise: '#40E0D0',
    coral: '#FF6F61'
  };

  onMount(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(stages);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 1]);

    // Create bars
    svg.selectAll('.bar')
      .data(stages)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d))
      .attr('width', x.bandwidth())
      .attr('y', d => y(profileData[d]))
      .attr('height', d => height - y(profileData[d]))
      .attr('fill', d => colors[d])
      .attr('opacity', d => d === centerOfGravity ? 1 : 0.7);

    // Add center of gravity indicator
    const centerX = x(centerOfGravity) + x.bandwidth() / 2;
    svg.append('line')
      .attr('x1', centerX)
      .attr('x2', centerX)
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  });
</script>

<div class="spiral-profile">
  <div bind:this={chart}></div>
  <div class="legend">
    {#each stages as stage}
      <div class="legend-item">
        <span 
          class="color-box" 
          style="background-color: {colors[stage]}"
        ></span>
        <span>{stage}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .spiral-profile {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .color-box {
    width: 1rem;
    height: 1rem;
    border-radius: 2px;
  }
</style>
