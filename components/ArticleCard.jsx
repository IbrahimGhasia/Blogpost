import { Card, Image, Text, Title } from '@mantine/core';

export function ArticleCard({ post }) {
	return (
		<Card
			shadow='sm'
			p='xl'
			component='a'
			href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
			target='_blank'
		>
			<Card.Section>
				<Image
					src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZ2dpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
					height={160}
					alt='No way!'
				/>
			</Card.Section>

			<Title weight={500} mt='md'>
				{post.title}
			</Title>

			<Text mt='xs' color='blue' size='sm'>
				Author : {post.address}
			</Text>

			<Text mt='xs' color='dimmed' size='lg'>
				{post.content}
			</Text>
		</Card>
	);
}
