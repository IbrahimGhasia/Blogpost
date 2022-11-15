import { useState } from 'react';
import Link from 'next/link';
import { createStyles, Navbar, Group, Code, Text } from '@mantine/core';
import {
	IconBellRinging,
	IconFingerprint,
	IconKey,
	IconSettings,
	Icon2fa,
	IconDatabaseImport,
	IconReceipt2,
	IconSwitchHorizontal,
	IconLogout,
	IconHome,
	IconCirclePlus,
	IconDashboard,
} from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef('icon');
	return {
		navbar: {
			backgroundColor: theme.fn.variant({
				variant: 'filled',
				color: theme.primaryColor,
			}).background,
		},

		version: {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant('filled', theme.primaryColor).background,
				0.1
			),
			color: theme.white,
			fontWeight: 700,
		},

		header: {
			paddingBottom: theme.spacing.md,
			marginBottom: theme.spacing.md * 1.5,
			borderBottom: `1px solid ${theme.fn.lighten(
				theme.fn.variant('filled', theme.primaryColor).background,
				0.1
			)}`,
		},

		footer: {
			paddingTop: theme.spacing.md,
			marginTop: theme.spacing.md,
			borderTop: `1px solid ${theme.fn.lighten(
				theme.fn.variant('filled', theme.primaryColor).background,
				0.1
			)}`,
		},

		link: {
			...theme.fn.focusStyles(),
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			fontSize: theme.fontSizes.sm,
			color: theme.white,
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,

			'&:hover': {
				backgroundColor: theme.fn.lighten(
					theme.fn.variant('filled', theme.primaryColor).background,
					0.1
				),
			},
		},

		linkIcon: {
			ref: icon,
			color: theme.white,
			opacity: 0.75,
			marginRight: theme.spacing.sm,
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor: theme.fn.lighten(
					theme.fn.variant('filled', theme.primaryColor).background,
					0.15
				),
				[`& .${icon}`]: {
					opacity: 0.9,
				},
			},
		},
	};
});

const data = [
	{ link: '/home', label: 'Dashboard', icon: IconDashboard },
	{ link: '/register', label: 'Register', icon: IconFingerprint },
	{ link: '/post', label: 'Create new Post', icon: IconCirclePlus },
	// { link: '', label: 'Databases', icon: IconDatabaseImport },
	// { link: '', label: 'Authentication', icon: Icon2fa },
	// { link: '', label: 'Other Settings', icon: IconSettings },
];

export function SimpleNavbar() {
	const { classes, cx } = useStyles();
	const [active, setActive] = useState('Billing');

	const links = data.map((item) => (
		<Link href={item.link} legacyBehavior>
			<a
				className={cx(classes.link, {
					[classes.linkActive]: item.label === active,
				})}
				key={item.label}
				onClick={(event) => {
					// event.preventDefault();
					setActive(item.label);
				}}
			>
				<item.icon className={classes.linkIcon} stroke={1.5} />
				<span>{item.label}</span>
			</a>
		</Link>
	));

	return (
		<Navbar
			height={622}
			width={{ sm: 300 }}
			p='md'
			className={classes.navbar}
		>
			<Navbar.Section grow>
				<Group className={classes.header} position='apart'>
					{/* <MantineLogo size={28} inverted /> */}
					{/* <h1>Blogpost</h1> */}
					<Link href='/'>
						<Text fz='xl' fw={700} c='white'>
							Blogpost
						</Text>
					</Link>
				</Group>
				{links}
			</Navbar.Section>
		</Navbar>
	);
}
