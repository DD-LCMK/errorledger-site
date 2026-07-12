import fs from 'fs';
import path from 'path';

const packages = [
  // Frameworks & Runtimes
  { id: 'next', name: 'Next.js' },
  { id: 'astro', name: 'Astro' },
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'bun', name: 'Bun Runtime' },
  { id: 'deno', name: 'Deno' },
  
  // Databases & ORMs
  { id: 'prisma', name: 'Prisma ORM' },
  { id: 'drizzle-orm', name: 'Drizzle ORM' },
  { id: '@supabase/supabase-js', name: 'Supabase JS' },
  { id: 'mongodb', name: 'MongoDB Driver' },
  { id: 'mongoose', name: 'Mongoose' },
  { id: 'redis', name: 'Redis Client' },

  // Auth & Security
  { id: '@clerk/backend', name: 'Clerk Backend' },
  { id: 'auth0', name: 'Auth0 Node' },
  { id: 'jose', name: 'Jose JWT' },
  { id: 'jsonwebtoken', name: 'JsonWebToken' },

  // Backend & Utilities
  { id: 'express', name: 'Express' },
  { id: 'fastify', name: 'Fastify' },
  { id: 'stripe', name: 'Stripe Node' },
  { id: 'resend', name: 'Resend SDK' },
  { id: 'zod', name: 'Zod Validation' },
  { id: 'axios', name: 'Axios' }
];

async function updateVersions() {
  const results = [];
  
  // 1. Fetch Latest Node.js Version
  try {
    const nodeRes = await fetch('https://nodejs.org/dist/index.json');
    const nodeData = await nodeRes.json();
    results.push({ name: 'Node.js', version: nodeData[0].version });
  } catch {
    results.push({ name: 'Node.js', version: 'v24.18.0' });
  }

  // 2. Fetch NPM Packages
  for (const pkg of packages) {
    try {
      const res = await fetch(`https://registry.npmjs.org/${pkg.id}/latest`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      results.push({ name: pkg.name, version: `v${data.version}` });
    } catch {
      results.push({ name: pkg.name, version: 'Unknown' });
    }
  }

  // 3. Write securely to the static data path
  const targetPath = path.resolve('./src/data/versions.json');
  fs.writeFileSync(targetPath, JSON.stringify(results, null, 2));
  console.log('Successfully compiled fresh ecosystem versions matrix.');
}

updateVersions();