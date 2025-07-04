import { FolderX } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { ExtendedTheme } from '@avyyx/admin-ui';
import { PermissionAccess } from '@avyyx/admin-utils';

import { CreateProject } from '../CreateProject';

export const NoProjectsFoundCta = () => {
    const {palette} = useTheme<ExtendedTheme>()
    return (
        <Stack 
            direction="column" 
            spacing={1} 
            alignItems="center" 
            justifyContent="center" 
            height="100%"
            paddingBottom={30}
            textAlign="center"
        >
            <FolderX size={60} color={palette.primary.main} strokeWidth={1} />
            <Typography variant="h5">
                <FormattedMessage
                    id="projects.empty"
                    defaultMessage="No projects found"
                />
            </Typography>
            <Typography variant="body1" color="text.secondary">
                <FormattedMessage
                    id="projects.empty.description"
                    defaultMessage="You don't have any projects you are working on"
                />
            </Typography>
            <PermissionAccess
                permissions={[
                    { action: 'create', resource: 'admin:project' }
                ]}
            >
                <Box paddingTop={2}>
                    <CreateProject />
                </Box>
            </PermissionAccess>
        </Stack>
    )
};
