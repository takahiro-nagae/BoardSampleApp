require "test_helper"

class PostControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get post_index_url
    assert_response :success
  end

  test "should get getPost" do
    get post_getPost_url
    assert_response :success
  end
end
