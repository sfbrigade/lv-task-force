import { useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import { Anchor, Avatar, Burger, Container, Group, Menu, Title } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header ({ opened, close, toggle }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => Api.users.me().then((response) => response.status === StatusCodes.OK ? response.data : null),
  });

  useEffect(
    function () {
      if (isSuccess) {
        setUser(data);
      }
    },
    [data, isSuccess, setUser]
  );

  async function onLogout (event) {
    event.preventDefault();
    await Api.auth.logout();
    queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    setUser(null);
    close();
    navigate('/');
  }

  return (
    <Container h='100%'>
      <Group h='100%' align='center' justify='space-between'>
        <Link to='/' onClick={close}>
          <Title size='xl'>LV Task Force</Title>
        </Link>
        <Group visibleFrom='sm' gap='xl'>
          <Anchor component={NavLink} aria-current='page' to='/' onClick={close}>
            Home
          </Anchor>
          {user && (
            <>
              {user.isAdmin && (
                <Menu trigger='hover' transitionProps={{ exitDuration: 0 }} withinPortal>
                  <Menu.Target>
                    <Anchor component={NavLink} to='/admin'>Admin</Anchor>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item><Anchor component={NavLink} to='/admin/invites'>Invites</Anchor></Menu.Item>
                    <Menu.Item><Anchor component={NavLink} to='/admin/users'>Users</Anchor></Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
              <Group gap='xs'>
                <span>
                  Hello,{' '}
                  <Anchor component={NavLink} to='/account' onClick={close}>
                    {user.firstName}!
                  </Anchor>
                </span>
                {user.pictureUrl && <Avatar src={user.pictureUrl} />}
              </Group>
              <Anchor href='/logout' onClick={onLogout}>
                Log out
              </Anchor>
            </>
          )}
          {!user && (
            <Anchor component={NavLink} to='/login' onClick={close}>
              Log in
            </Anchor>
          )}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
      </Group>
    </Container>
  );
}

export default Header;
