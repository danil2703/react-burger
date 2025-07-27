import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '@/services/user/user';
import { Preloader } from '../preloader/preloader';

type ProtectedProps = {
	component: JSX.Element;
	onlyUnAuth?: boolean;
};

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: ProtectedProps) => (
	<Protected onlyUnAuth={true} component={component} />
);
