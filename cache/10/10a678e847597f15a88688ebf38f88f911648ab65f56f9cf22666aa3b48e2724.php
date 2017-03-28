<?php

/* home/_home.twig */
class __TwigTemplate_9f86b3d49772fa1de367dbe997d15ade253c46f32ad055bcbb69c1d4d8840cb9 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("main.twig", "home/_home.twig", 1);
        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'content_current' => array($this, 'block_content_current'),
            'load_scripts' => array($this, 'block_load_scripts'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "main.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_title($context, array $blocks = array())
    {
        echo twig_escape_filter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true);
    }

    // line 3
    public function block_content_current($context, array $blocks = array())
    {
    }

    // line 10
    public function block_load_scripts($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "home/_home.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  41 => 10,  36 => 3,  30 => 2,  11 => 1,);
    }
}
/* {% extends "main.twig" %}*/
/* {% block title %}{{ title }}{% endblock %}*/
/* {% block content_current %}{% endblock %}*/
/* {#*/
/* {% block script_load_js %}*/
/* 	{% embed "super_loadjs.twig" %}{% endembed %}*/
/* 	<input type="hidden" name="section" id="section" value="home">*/
/* {% endblock %}*/
/* #}*/
/* {% block load_scripts %}{% endblock %}*/
