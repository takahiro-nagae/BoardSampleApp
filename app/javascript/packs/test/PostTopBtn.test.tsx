import * as renderer from 'react-test-renderer';
import { PostTopBtn } from '../post/postTopBtn';

test('投稿一覧トップボタン：コンポーネントテスト', () => {
    const component = renderer.create(<PostTopBtn />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('投稿一覧トップボタン：ボタンテスト', () => {
  const component = renderer.create(<PostTopBtn />);
  const instance = component.root;

  test('ボタンの要素数確認', () => {
    expect(instance.findByType('button'));
  });

  test('ボタンの文言確認', () => {
    expect(instance.findByProps({type: "button"}).children).toEqual(['戻る']);
  });
});