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

	const [title, setTitle] = useState();
	const [content, setContent] = useState();

	// const form = useForm({
	// 	initialValues: {
	// 		title: '',
	// 	},

	// 	validate: {
	// 		title: (value) =>
	// 			value.length > 2
	// 				? null
	// 				: 'Invalid Title. Title should be more than 2 character',
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

		console.log(title, content);

		const contractInstance = new ethers.Contract(
			blogpostContractAddress,
			blogpostAbi,
			signer
		);

		const tx = await contractInstance.createPost(title, content);
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
					<h1>Create New Post</h1>
					<form
					// onSubmit={form.onSubmit((values) =>
					// 	console.log(values)
					// )}
					>
						<Grid>
							<Grid.Col span={12}>
								<TextInput
									withAsterisk
									label='Title'
									placeholder='Kashmir Journey'
									// {...form.getInputProps('title')}
									onChange={(event) => {
										setTitle(event.currentTarget.value);
									}}
								/>
							</Grid.Col>

							<Grid.Col span={12}>
								<Textarea
									placeholder='Add your Blog Content Here ... '
									label='Content'
									withAsterisk
									minRows={8}
									onChange={(event) => {
										setContent(event.currentTarget.value);
									}}
								/>
							</Grid.Col>

							<Grid.Col span={12}>
								<FileInput
									label='Cover Photo'
									placeholder='Add your cover photo for the blog'
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
