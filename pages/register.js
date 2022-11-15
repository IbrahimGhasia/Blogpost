import { Layout } from '../components/Layout';
import {
	TextInput,
	Textarea,
	Button,
	Group,
	Box,
	Grid,
	FileInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload, IconX, IconCheck } from '@tabler/icons';
import { useState } from 'react';

import { ethers } from 'ethers';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useAccount } from 'wagmi';
import { useSigner } from 'wagmi';
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	useSignMessage,
} from 'wagmi';
import { blogpostAbi, blogpostContractAddress, tableland } from '../constants';

export default function Home() {
	const { isConnected } = useAccount();
	const { data: signer, isError, isLoading } = useSigner();

	const [username, setUsername] = useState();
	const [bio, setBio] = useState();
	// const form = useForm({
	// 	initialValues: {
	// 		username: '',
	// 	},

	// 	validate: {
	// 		username: (value) =>
	// 			value.length > 2
	// 				? null
	// 				: 'Invalid Username. Username should be more than 2 character',
	// 	},
	// });

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!isConnected) {
			showNotification({
				id: 'hello',
				autoClose: 5000,
				title: 'Connect Wallet',
				message: 'Please Connect your wallet to register',
				color: 'red',
				icon: <IconX />,
				className: 'my-notification-class',
				loading: false,
			});
			return;
		}

		showNotification({
			id: 'load-data',
			loading: true,
			title: 'Posting...',
			message:
				'Please wait while we are posting your content to the blockchain',
			autoClose: false,
			disallowClose: true,
		});

		console.log(username, bio);

		const contractInstance = new ethers.Contract(
			blogpostContractAddress,
			blogpostAbi,
			signer
		);

		const tx = await contractInstance.createUser(username, bio);
		console.log(tx.hash);
		console.log('-----------------------------');
		const response = await tx.wait();
		console.log('DONE!!!!!!!!!!!!!!!!!!');
		console.log('response');
		console.log(response);
		console.log('-----------------------------');

		updateNotification({
			id: 'load-data',
			color: 'teal',
			title: 'Posted Successfully',
			icon: <IconCheck size={16} />,
			autoClose: 2000,
		});
	};

	return (
		<div>
			<Layout>
				<Box sx={{ maxWidth: 600 }} mx='auto' mt='3%'>
					<h1>Register User</h1>
					<form
					// onSubmit={form.onSubmit((values) =>
					// 	console.log(values)
					// )}
					>
						<Grid>
							<Grid.Col span={12}>
								<TextInput
									withAsterisk
									label='Username'
									placeholder='rayn@123'
									// {...form.getInputProps('username')}
									onChange={(event) =>
										setUsername(event.currentTarget.value)
									}
								/>
							</Grid.Col>

							<Grid.Col span={12}>
								<Textarea
									placeholder='Your Bio'
									label='Bio'
									withAsterisk
									onChange={(event) =>
										setBio(event.currentTarget.value)
									}
								/>
							</Grid.Col>

							<Grid.Col span={12}>
								<FileInput
									label='Profile Pic'
									placeholder='Your profile pic'
									icon={<IconUpload size={14} />}
									// {...form.getInputProps('profilePic')}
								/>
							</Grid.Col>

							<Grid.Col>
								<Group position='right' mt='md'>
									<Button
										type='submit'
										onClick={handleSubmit}
									>
										Submit
									</Button>
								</Group>
							</Grid.Col>
						</Grid>
					</form>
				</Box>
			</Layout>
		</div>
	);
}
