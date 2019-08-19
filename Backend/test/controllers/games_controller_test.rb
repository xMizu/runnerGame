require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get games_create_url
    assert_response :success
  end

  test "should get edit" do
    get games_edit_url
    assert_response :success
  end

  test "should get delete" do
    get games_delete_url
    assert_response :success
  end

  test "should get index" do
    get games_index_url
    assert_response :success
  end

end
