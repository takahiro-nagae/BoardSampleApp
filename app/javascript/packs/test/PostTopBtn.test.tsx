import * as renderer from 'react-test-renderer';
import { PostTopBtn } from '../post/postTopBtn';

test('投稿一覧トップボタン：コンポーネントテスト', () => {
    const component = renderer.create(<PostTopBtn />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});