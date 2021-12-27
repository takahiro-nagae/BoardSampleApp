require "test_helper"

class CategoryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get category_index_url
    assert_response :success
  end

  test "should get ajax" do
    get category_ajax_url
    assert_response :success
  end
end
