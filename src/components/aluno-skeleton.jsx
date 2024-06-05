import ContentLoader from 'react-content-loader'

export const AlunoSkeleton = props => (
  <ContentLoader
    viewBox="0 0 500 258"
    height="100%"
    width="100%"
    backgroundColor="#a3a3a3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="350" height="15" />
    <rect x="0" y="24" rx="1" ry="1" width="270" height="6" />
    <rect x="0" y="37" rx="1" ry="1" width="300" height="6" />
    <rect x="0" y="50" rx="1" ry="1" width="150" height="6" />
    <rect x="0" y="62" rx="1" ry="1" width="283" height="8" />
    <rect x="0" y="92" rx="2" ry="2" width="150" height="9" />
    <rect x="0" y="111" rx="10" ry="10" width="201" height="87" />
    <rect x="208" y="111" rx="10" ry="10" width="201" height="87" />
  </ContentLoader>
)

AlunoSkeleton.metadata = {
  name: 'RoyalBhati',
  github: 'royalbhati',
  description: 'Simple Article',
  filename: 'Article',
}