import { mount } from '@vue/test-utils'
import HelloWorld from './../../src/components/HelloWorld.vue'

describe('HelloWorld', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(HelloWorld)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="hello">')
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})