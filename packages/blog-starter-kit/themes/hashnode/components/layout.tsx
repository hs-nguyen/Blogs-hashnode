import React from 'react';
import { Analytics } from './analytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen bg-gradient-to-br from-white via-brand-50/30 to-accent-50/20 dark:from-neutral-950 dark:via-brand-950/30 dark:to-accent-950/20">
				<main>{children}</main>
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};
