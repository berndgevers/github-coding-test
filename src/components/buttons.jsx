import { useHistory } from "react-router-dom";

export function FloatingRedirectCornerButton({
  url = "#",
  label = "Button",
  corner = "top-right",
  data,
}) {
  const { push } = useHistory();
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <button
      className={corner}
      onClick={() => {
        push({ pathname: url, state: data || {} });
      }}
    >
      {label}
    </button>
  );
}
