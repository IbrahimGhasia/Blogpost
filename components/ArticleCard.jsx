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
					src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
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
