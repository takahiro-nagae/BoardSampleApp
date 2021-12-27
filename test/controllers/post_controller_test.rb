require "test_helper"

class PostControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get post_index_url
    assert_response :success
  end

  test "should get getPostData" do
    get post_getPostData_url
    assert_response :success
  end
end
