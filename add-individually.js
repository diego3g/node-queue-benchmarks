const Redis = require('ioredis');
const { Queue } = require('bullmq');

const redis = new Redis()

const queue = new Queue('test-queue', {
  connection: redis,
})

const bigArray = [...new Array(20000)].map(() => {
  return {
    contact: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    },
    sender: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    },
    message: {
      subject: 'New message subject testing',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in nunc eu sem euismod laoreet. Suspendisse interdum dictum nisl, ut aliquet nisi. Integer consequat, turpis vitae tincidunt vulputate, nisi sem porttitor est, et sodales magna nulla vehicula mauris. Sed pulvinar lectus sit amet ipsum blandit hendrerit. Aenean ut metus purus. Donec commodo nibh neque, ut rhoncus leo volutpat id. Ut tincidunt, est a pulvinar congue, enim ex vestibulum massa, et ullamcorper neque nibh quis mauris. Suspendisse sed pulvinar justo. Maecenas erat sapien, fermentum at vehicula eu, laoreet id diam. Suspendisse commodo velit non quam cursus, at faucibus ligula tristique. Nunc malesuada arcu vitae lorem aliquet egestas. Quisque est nibh, congue ut ipsum id, rhoncus dapibus odio. Fusce id ex urna.

        Vestibulum consectetur purus arcu, vel tincidunt lacus congue a. Cras lacinia diam quis imperdiet condimentum. Nam id mi vel mi imperdiet laoreet. Quisque ac diam risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ornare massa at erat scelerisque aliquet. Morbi nulla lacus, volutpat ut est sit amet, vehicula scelerisque libero. Mauris ac dolor ipsum. Vivamus aliquet euismod sapien, id laoreet risus consequat sed. Vestibulum elementum condimentum dolor a gravida. Suspendisse velit mi, vehicula quis efficitur sed, elementum sed nunc. Nam iaculis scelerisque aliquam. Donec placerat, lectus quis dapibus laoreet, magna nulla posuere turpis, eget vehicula quam sem ut velit. Nulla suscipit orci ex, at bibendum neque euismod eget. Sed vitae nibh ut lorem interdum porta non eget leo. Morbi finibus dolor et odio facilisis gravida eu et nunc.
        
        Donec maximus tellus erat, pellentesque blandit risus ultrices sit amet. Praesent aliquam id odio sagittis imperdiet. Morbi a quam a dolor faucibus accumsan in in risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc interdum ipsum et scelerisque blandit. Ut at felis ut enim dictum facilisis. Donec vel tellus elementum, aliquet tortor ac, ullamcorper nunc. Nam ac odio eu mauris tempor finibus. Sed convallis magna vitae enim malesuada pretium. 
      `
    }
  }
});

async function main() {
  await Promise.all(bigArray.map(data => {
    return queue.add({ data })
  }))

  console.log({
    memory: process.memoryUsage().heapUsed,
  })
}

main()