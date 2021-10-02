<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/plugin-scheduled-tasks

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to add support for scheduled tasks.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-scheduled-tasks?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-scheduled-tasks)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-scheduled-tasks?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-scheduled-tasks)

</div>

## Description

Often bots have features that need to run on periodic schedules such as uploading analytics data, reminders for users, birthdays, scheduled giveaways, undoing moderation actions, and more. There are many ways to achieve this, but as goes with many time-based events they are often spotty at best in their reliability. To make an attempt to save this issue we offer this plugin. You can save your scheduled tasks using different strategies such as Redis and SQS.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint

## Installation

`@sapphire/plugin-scheduled-tasks` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-scheduled-tasks @sapphire/framework
```

---

## Usage

This registers the necessary options and methods in the Sapphire client to be able to use the log plugin.

```typescript
// Main bot file
// Be sure to register the plugin before instantiating the client.
import '@sapphire/plugin-scheduled-tasks/register';
```

In order to use the scheduled tasks in any place other than a piece (commands, arguments, preconditions, etc.), you must first import the `container` property of `@sapphire/framework`. For pieces, you can simply use `this.container.tasks` to access Scheduled tasks methods.

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeService {
	public createAwesomeTask() {
		container.tasks.create('name', { id: '123' }, 2000);
	}
}
```

Here is an example mute command, demonstrating the use of `this.container.tasks` from within a piece by omitting the explicit import.

```typescript
// ping command

import { Command, CommandOptions, PieceContext } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class MuteCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Mute a user'
		});
	}

	public async run(message: Message) {
	    // create a task to unmute the user in 1 hour
		this.container.tasks.create('unmute', { authorId: message.author.id }, 60000);
	}
}
```

### Create a task handler

Scheduled tasks are handled like any other piece. You can create a directory with the name `scheduled-tasks` and add `ScheduledTask` pieces in there.

#### Manual task example

##### Creating the Piece:
```typescript
import type { PieceContext } from '@sapphire/framework';
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class ManualTask extends ScheduledTask {
	public constructor(context: PieceContext, options: ScheduledTask.Options) {
		super(context, {
			...options
		});
	}

	public async run(payload: ScheduledTask.Payload) {
		this.container.logger.info('I am ran manually', payload);
	}
}

declare module '@sapphire/framework' {
	interface ScheduledTasks {
		manual: never;
	}
}
```

##### Using Manual task
```typescript
container.tasks.create('manual', payload, 5000)
```

#### Cron task example
Cron jobs are currently only supported by the Redis strategy.

##### Creating the Piece:
```typescript
import type { PieceContext } from '@sapphire/framework';
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class CronTask extends ScheduledTask {
	public constructor(context: PieceContext, options: ScheduledTask.Options) {
		super(context, {
			...options,
			cron: '00 * * * *'
		});
	}

	public async run() {
		this.container.logger.info('I run every hour at *:00');
	}
}

declare module '@sapphire/framework' {
	interface ScheduledTasks {
		cron: never;
	}
}

```

##### Using Cron tasks
Cron & Interval tasks are loaded automatically.


#### Interval task example

##### Creating the Piece:
```typescript
import type { PieceContext } from '@sapphire/framework';
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class IntervalTask extends ScheduledTask {
	public constructor(context: PieceContext, options: ScheduledTask.Options) {
		super(context, {
			...options,
			interval: (60 * 1000) // 60 seconds
		});
	}

	public async run() {
		this.container.logger.info('I run every minute');
	}
}

declare module '@sapphire/framework' {
	interface ScheduledTasks {
		interval: never;
	}
}

```

##### Using Interval tasks
Cron & Interval tasks are loaded automatically.
## Documentation

For the full @sapphire/plugin-scheduled-tasks documentation please refer to the TypeDoc generated [documentation](https://sapphiredev.github.io/plugins/modules/_sapphire_plugin_scheduled_tasks.html).

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Favna" title="Code">💻</a> <a href="#infra-Favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-Favna" title="Project Management">📆</a></td>
    <td align="center"><a href="https://quantumlytangled.com"><img src="https://avatars1.githubusercontent.com/u/7919610?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nejc Drobnic</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=QuantumlyTangled" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/commits?author=QuantumlyTangled" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kyranet"><img src="https://avatars0.githubusercontent.com/u/24852502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antonio Román</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=kyranet" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vladfrangu"><img src="https://avatars3.githubusercontent.com/u/17960496?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Frangu</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/pulls?q=is%3Apr+reviewed-by%3Avladfrangu" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/apps/depfu"><img src="https://avatars3.githubusercontent.com/in/715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>depfu[bot]</b></sub></a><br /><a href="#maintenance-depfu[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars0.githubusercontent.com/in/29110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#maintenance-dependabot[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/allcontributors"><img src="https://avatars0.githubusercontent.com/in/23186?v=4?s=100" width="100px;" alt=""/><br /><sub><b>allcontributors[bot]</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=allcontributors[bot]" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Nytelife26"><img src="https://avatars1.githubusercontent.com/u/22531310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler J Russell</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Nytelife26" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Stitch07"><img src="https://avatars.githubusercontent.com/u/29275227?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stitch07</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Stitch07" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/issues?q=author%3AStitch07" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/PlatinBae"><img src="https://avatars.githubusercontent.com/u/50950966?v=4?s=100" width="100px;" alt=""/><br /><sub><b>PlatinBae</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=PlatinBae" title="Documentation">📖</a></td>
    <td align="center"><a href="https://kaname.netlify.app"><img src="https://avatars.githubusercontent.com/u/56084970?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kaname</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=kaname-png" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/commits?author=kaname-png" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
