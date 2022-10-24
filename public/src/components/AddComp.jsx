import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

export function AddComp(Component,{title, buttonInfo}) {
	const [opened, setOpened] = useState(false);
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title={title}
			>
				<Component/>
			</Modal>

			<Group position="center">
				<Button onClick={() => setOpened(true)}>{buttonInfo}</Button>
			</Group>
		</>
	);
}