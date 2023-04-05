import { useNavigate, useLocation } from 'react-router-dom';

export const useGoBackWithFallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // React Router V6 🤯
  const doesAnyHistoryEntryExist = location.key !== 'default';

  return (fallbackPath: string) => {
    if (doesAnyHistoryEntryExist) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };
};
