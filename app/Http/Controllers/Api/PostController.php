<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orderCol = $request->input('order_column', 'id');
        $orderDir = $request->input('order_direction', 'desc');

        // security
        if (!in_array($orderCol, ['id', 'title']))
            $orderCol = 'id';

        if (!in_array($orderDir, ['asc', 'desc']))
            $orderDir = 'desc';

        $posts = Post::with('category')
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->where('category_id', intval($request->category_id));
            })
            ->orderBy($orderCol, $orderDir)
            ->paginate(10);
        return PostResource::Collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());

        if ($request->hasFile('thumbnail')) {
            $fileName = $request->file('thumbnail')->getClientOriginalName();
            $post['thumbnail'] = 'https://' . $fileName . '.com';
        }

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->validated());
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }
}
