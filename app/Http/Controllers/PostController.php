<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();

        if (count($data) > 0) 
        {
            $res['message'] = 'success';
            $res['values'] = $data;
            
            return response($res,200);
        }
        else
        {
            $res['message'] = 'failed';
            return response($res,400);
        }
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        $db = new Post;
        $db->title = $request->title;
        $db->slug = str_slug($request->title);
        $db->content = $request->content;

        if ($db->save())
        {
            $res['message'] = 'success';
            return response($res);
        }
        else
        {
            $res['message'] = 'failed';
            return response($res);
        }
    }

    public function show($id)
    {
        $data = Post::where('id', $id)->first();

        if (count($data) > 0)
        {
            $res['message'] = 'success';
            $res['value'] = $data;

            return response($res);
        }
        else
        {
            $res['message'] = 'failed';

            return response($res);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $db = Post::find($id);
        $db->title = $request->title;
        $db->slug = str_slug($request->title);
        $db->content = $request->content;

        if ($db->save())
        {
            $res['message'] = 'success';

            return response($res);
        }
        else
        {
            $res['message'] = 'failed';

            return response($res);
        }
    }

    public function destroy($id)
    {
        $data = Post::where('id',$id)->first();

        if ($data->delete())
         {
            $res['message'] = 'success';

            return response($res);
        }
        else
        {
            $res['message'] = 'failed';

            return response($res);
        }
    }
}
