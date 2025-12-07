#!/usr/bin/env node

// Updates package.json dependency ranges to the latest published versions
// using the project's package manager (pnpm, npm, or npx fallback).

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const targetDir = process.argv[2];
const projectRoot = targetDir ? path.resolve(targetDir) : process.cwd();
const packageJsonPath = path.join(projectRoot, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('package.json not found in this directory.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const hasLock = (file) => fs.existsSync(path.join(projectRoot, file));

const canRun = (bin) => {
  const result = spawnSync(bin, ['--version'], { encoding: 'utf8' });
  return result.status === 0;
};

const detectPackageManager = () => {
  if (typeof pkg.packageManager === 'string') {
    if (pkg.packageManager.startsWith('pnpm')) {
      return { bin: 'pnpm', args: [], label: 'pnpm (from packageManager field)' };
    }
    if (pkg.packageManager.startsWith('npm')) {
      return { bin: 'npm', args: [], label: 'npm (from packageManager field)' };
    }
  }

  if (hasLock('pnpm-lock.yaml')) {
    return { bin: 'pnpm', args: [], label: 'pnpm (pnpm-lock.yaml found)' };
  }

  if (hasLock('package-lock.json')) {
    return { bin: 'npm', args: [], label: 'npm (package-lock.json found)' };
  }

  if (canRun('pnpm')) {
    return { bin: 'pnpm', args: [], label: 'pnpm (detected on PATH)' };
  }

  if (canRun('npm')) {
    return { bin: 'npm', args: [], label: 'npm (detected on PATH)' };
  }

  return { bin: 'npx', args: ['--yes', 'npm@latest'], label: 'npx npm@latest (fallback)' };
};

const packageManager = detectPackageManager();

const latestVersion = (depName) => {
  const result = spawnSync(
    packageManager.bin,
    [...packageManager.args, 'view', depName, 'version'],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) {
    console.error(`⚠️  Could not fetch ${depName}. Keeping existing version.`);
    if (result.stderr) {
      console.error(result.stderr.toString().trim());
    }
    return null;
  }

  return result.stdout.toString().trim();
};

const updateSection = (sectionName) => {
  const deps = pkg[sectionName];
  if (!deps) return;

  for (const [name, currentRange] of Object.entries(deps)) {
    if (/^(file:|link:|workspace:|git\+)/.test(currentRange)) {
      console.log(`Skipping ${sectionName} ${name} (${currentRange})`);
      continue;
    }

    const prefix = currentRange.match(/^([\^~])/)?.[1] ?? '';
    const latest = latestVersion(name);
    if (!latest) continue;

    const nextRange = `${prefix}${latest}`;
    if (nextRange === currentRange) {
        console.log(`${sectionName} ${name} already at latest (${currentRange})`);
    } else {
        console.log(`${sectionName} ${name}: ${currentRange} -> ${nextRange}`);
        deps[name] = nextRange;
    }
  }
};

console.log(`Updating package.json using ${packageManager.label}...`);
['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].forEach(
  updateSection
);

fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log('package.json updated. Run your package manager install to refresh the lockfile.');
